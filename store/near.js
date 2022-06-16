import getConfig from '@/config.js';
import * as nearAPI from 'near-api-js';

export const state = () => ({
    contract: {},
    currentUser: false,
    nearConfig: {},
    walletConnection: ''
})

export const mutations = {
    setContract(state, contract) {
        state.contract = contract;
    },
    setCurrentUser(state, currentUser) {
        state.currentUser = currentUser;
    },
    setNearConfig(state, nearConfig) {
        state.nearConfig = nearConfig;
    },
    setWalletConnection(state, walletConnection) {
        state.walletConnection = walletConnection;
    }
}

export const actions = {
    async initContract({commit}) {
        const nearConfig = getConfig(process.env.NEAR_ENV || 'testnet');
        const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
        const near = await nearAPI.connect({keyStore: keyStore, ...nearConfig});

        const walletConnection = new nearAPI.WalletConnection(near);

        if (walletConnection.getAccountId()) {
            const currentUser = {
                accountId: state.walletConnection.getAccountId(),
                balance: (await state.walletConnection.account().state()).amount,
            };
            commit('setCurrentUser', currentUser);
        }

        const contract = await new nearAPI.Contract(
            walletConnection.account(),
            nearConfig.contractName,
            {
                viewMethods: ['getMessages'],
                changeMethods: ['addMessage'],
                sender: walletConnection.getAccountId(),
            }
        );
        commit('setContract', contract);
        commit('setNearConfig', nearConfig);
        commit('setWalletConnection', walletConnection);
    },
}

export const getters = {
    getContract: state => state.contract,
    getCurrentUser: state => state.currentUser,
    getNearConfig: state => state.nearConfig,
    getWalletConnection: state => state.walletConnection,
}
