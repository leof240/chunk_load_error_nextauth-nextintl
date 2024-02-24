
export class LoginError extends Error {

    redirectUrl: string | undefined;

    constructor(message: string, redirectUrl?: string) {

        if (redirectUrl === undefined) {
            redirectUrl = "";
        }
        super(message + " " + redirectUrl);
        this.name = "LoginError";

    }

    showErrorMessage() {
        return `${this.message} <a href="${this.redirectUrl}">here</a>`;
    }

    getRedirectUrl() {
        return this.redirectUrl;
    }
}

