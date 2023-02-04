import type { StorageProxy } from "../@types/session-proxy";
import type { TokensStorage } from "../@types/token/tokens";

class TokenLocalStorageProxy implements StorageProxy<TokensStorage> {
    setItem(value: TokensStorage) {
        localStorage.setItem("access-token", value.accessToken);
        localStorage.setItem("refresh-token", value.refreshToken);
    }

    getItem() {
        const accessToken = localStorage.getItem("access-token");
        const refreshToken = localStorage.getItem("refresh-token");

        return {
            accessToken,
            refreshToken,
        };
    }
}

export const tokenStorage = new TokenLocalStorageProxy();
