# Hi

This example is verifying the ID token from the Client when login Google. Return { Gmail, name, picture } from token to Sign-in social. Check the email in DB and Sign-in if had, and Sign-up if haven't. Return JWT token when login successful.

## Installation

Use the package OAuth2Client and framework NestJS.

```bash
npm i
```

## Usage

```python
const ticket = await client.verifyIdToken({
            idToken: getTokenGoogleDto.token_email,
            audience: config.GOOGLE_CLIENT_ID,
        });

const { email, name, picture } = ticket.getPayload();
const user = new CreateUserDto({ email, name, picture });
return this.authService.create(user);
```
