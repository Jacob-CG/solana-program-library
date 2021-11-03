import {Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
    ASSOCIATED_TOKEN_PROGRAM_ID, burn,
    createAssociatedTokenAccountInstruction,
    createInitializeMintInstruction, createMint,
    createSyncNativeInstruction,
    createTransferCheckedInstruction, getAccountInfo,
    getAssociatedTokenAddress, getOrCreateAssociatedTokenAccount, mintTo,
    TOKEN_PROGRAM_ID,
    TokenOwnerOffCurveError, transfer, transferChecked,
} from '../src';
import {toBigIntLE} from "bigint-buffer";

chai.use(chaiAsPromised);

describe('instructions', () => {
    it('TransferChecked', () => {
        const ix = createTransferCheckedInstruction(
            Keypair.generate().publicKey,
            Keypair.generate().publicKey,
            Keypair.generate().publicKey,
            Keypair.generate().publicKey,
            [],
            1,
            9
        );
        expect(ix.programId).to.eql(TOKEN_PROGRAM_ID);
        expect(ix.keys).to.have.length(4);
    });

    it('InitializeMint', () => {
        const ix = createInitializeMintInstruction(Keypair.generate().publicKey, 9, Keypair.generate().publicKey, null);
        expect(ix.programId).to.eql(TOKEN_PROGRAM_ID);
        expect(ix.keys).to.have.length(2);
    });

    it('SyncNative', () => {
        const ix = createSyncNativeInstruction(Keypair.generate().publicKey);
        expect(ix.programId).to.eql(TOKEN_PROGRAM_ID);
        expect(ix.keys).to.have.length(1);
    });

    it('AssociatedTokenAccount', () => {
        const ix = createAssociatedTokenAccountInstruction(
            Keypair.generate().publicKey,
            Keypair.generate().publicKey,
            Keypair.generate().publicKey,
            Keypair.generate().publicKey
        );
        expect(ix.programId).to.eql(ASSOCIATED_TOKEN_PROGRAM_ID);
        expect(ix.keys).to.have.length(7);
    });
});

describe('state', () => {
    it('getAssociatedTokenAddress', async () => {
        const associatedPublicKey = await getAssociatedTokenAddress(
            new PublicKey('7o36UsWR1JQLpZ9PE2gn9L4SQ69CNNiWAXd4Jt7rqz9Z'),
            new PublicKey('B8UwBUUnKwCyKuGMbFKWaG7exYdDk2ozZrPg72NyVbfj')
        );
        expect(associatedPublicKey.toString()).to.eql(
            new PublicKey('DShWnroshVbeUp28oopA3Pu7oFPDBtC1DBmPECXXAQ9n').toString()
        );
        await expect(
            getAssociatedTokenAddress(
                new PublicKey('7o36UsWR1JQLpZ9PE2gn9L4SQ69CNNiWAXd4Jt7rqz9Z'),
                associatedPublicKey
            )
        ).to.be.rejectedWith(TokenOwnerOffCurveError);

        const associatedPublicKey2 = await getAssociatedTokenAddress(
            new PublicKey('7o36UsWR1JQLpZ9PE2gn9L4SQ69CNNiWAXd4Jt7rqz9Z'),
            associatedPublicKey,
            true
        );
        expect(associatedPublicKey2.toString()).to.eql(
            new PublicKey('F3DmXZFqkfEWFA7MN2vDPs813GeEWPaT6nLk4PSGuWJd').toString()
        );
    });
});

describe('live-test', () => {
    const connection = new Connection(
        'http://127.0.0.1:8899',
        'confirmed'
    );

    const payer = Keypair.generate();
    const fromWallet = Keypair.generate();
    const toWallet  = Keypair.generate();
    const freezeAuthority = Keypair.generate();
    const mintAuthority = Keypair.generate();

    before(async () => {
        const airdropSignature = await connection.requestAirdrop(
            payer.publicKey,
            LAMPORTS_PER_SOL,
        );
        return connection.confirmTransaction(airdropSignature);
    })

    it('transfer', async () => {
        const mint = await createMint(
            connection,
            payer,
            mintAuthority.publicKey,
            freezeAuthority.publicKey,
            9
        )

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            fromWallet.publicKey
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            toWallet.publicKey
        );

        await mintTo(
            connection,
            payer,
            mint,
            fromTokenAccount.address,
            mintAuthority,
            [],
            1000000000
        );

        const toTokenAccountInfoPreTransfer = await getAccountInfo(
            connection,
            toTokenAccount.address
        )

        expect(toTokenAccountInfoPreTransfer.amount).to.eql(BigInt(0));

        await transfer(
            connection,
            payer,
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet,
            [],
            1000000000
        );

        const toTokenAccountInfoPostTransfer = await getAccountInfo(
            connection,
            toTokenAccount.address
        )

        expect(toTokenAccountInfoPostTransfer.amount).to.eql(BigInt(1000000000));

        await expect(transfer(
            connection,
            payer,
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet,
            [],
            1000000000
        )).to.be.rejected;
    });

    it('transferChecked', async () => {
        const mint = await createMint(
            connection,
            payer,
            mintAuthority.publicKey,
            freezeAuthority.publicKey,
            9
        )

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            fromWallet.publicKey
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            toWallet.publicKey
        );

        await mintTo(
            connection,
            payer,
            mint,
            fromTokenAccount.address,
            mintAuthority,
            [],
            1000000000
        );

        const toTokenAccountInfoPreTransfer = await getAccountInfo(
            connection,
            toTokenAccount.address
        )

        expect(toTokenAccountInfoPreTransfer.amount).to.eql(BigInt(0));

        await transferChecked(
            connection,
            payer,
            fromTokenAccount.address,
            mint,
            toTokenAccount.address,
            fromWallet,
            [],
            1,
            9
        );

        const toTokenAccountInfoPostTransfer = await getAccountInfo(
            connection,
            toTokenAccount.address
        )

        expect(toTokenAccountInfoPostTransfer.amount).to.eql(BigInt(1));

        await expect(transferChecked(
            connection,
            payer,
            fromTokenAccount.address,
            mint,
            toTokenAccount.address,
            fromWallet,
            [],
            1000000000,
            9
        )).to.be.rejected;
    })

    it('burn', async () => {
        const mint = await createMint(
            connection,
            payer,
            mintAuthority.publicKey,
            freezeAuthority.publicKey,
            9
        )

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            fromWallet.publicKey
        );

        await mintTo(
            connection,
            payer,
            mint,
            fromTokenAccount.address,
            mintAuthority,
            [],
            1000000000
        );

        const fromTokenAccountInfoPreBurn = await getAccountInfo(
            connection,
            fromTokenAccount.address
        )

        expect(fromTokenAccountInfoPreBurn.amount).to.eql(BigInt(1000000000));

        await burn(
            connection,
            payer,
            fromTokenAccount.address,
            mint,
            fromWallet,
            [],
            1
        )

        const fromTokenAccountInfoPostBurn = await getAccountInfo(
            connection,
            fromTokenAccount.address
        )

        expect(fromTokenAccountInfoPostBurn.amount).to.eql(BigInt(999999999));

    })
})
