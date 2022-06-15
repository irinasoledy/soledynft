import getConfig from '@/config.js';
import * as nearAPI from 'near-api-js';

export const state = () => ({
    contract: {},
    currentUser: false,
    nearConfig: {},
    walletConnection: {}
})

export const mutations = {
    async setContract(state) {
        const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');
        const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
        const near = await nearAPI.connect({keyStore, ...nearConfig});
        const walletConnection = new nearAPI.WalletConnection(near);

        let currentUser;
        if (walletConnection.getAccountId()) {
            currentUser = {
                accountId: walletConnection.getAccountId(),
                balance: (await walletConnection.account().state()).amount,
            };
        }

        state.contract = await new nearAPI.Contract(
            walletConnection.account(),
            nearConfig.contractName,
            {
                viewMethods: ['getMessages'],
                changeMethods: ['addMessage'],
                sender: walletConnection.getAccountId(),
            }
        );
        state.currentUser = currentUser;
        state.nearConfig = nearConfig;
        state.walletConnection = walletConnection;
        console.log(currentUser, nearConfig, walletConnection)
    },
}

export const actions = {
    initContract({commit}) {
        commit('setContract')
    },
}

export const getters = {
    getContract: state => state.contract,
    getCurrentUser: state => state.currentUser,
    getNearConfig: state => state.nearConfig,
    getWalletConnection: state => state.walletConnection,
}
