# vscode-pastemyst

[PasteMyst](https://paste.myst.rs/) is a simple website for sharing code - [Now as a Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=mellobacon.vscode-pastemyst).

This extension provides a way to paste to the website without leaving your IDE.

# Features

- Paste creation. You can create a paste with a few clicks.
    - Select single or multiple files
    - Select snippets of code from different files
    - Set custom title for the paste
    - Set the expiration for the paste
    - Once created, you will be given a link to the created paste

- Paste retrieval. 
    - You can retrieve pastes from the website via its paste ID.
        - Once retrieved you will be given readonly versions of the retrieved pasted files
        - These files will not be saved - they are for viewing only
    - You can retrieve pastes from your user account by providing your authorization token.

## Note
- You can optionally provide an authorization token. This token will allow you to access features only available to those who have a pastemyst account:
    - Retrieve private pastes from your account
    - Create pastes and send them to your account

# Known Issues
- Retrieving all pastes is currently not optimized. Will be fixed in the future.

# Planned Features
- The ability to edit pastes
- Getting a certain number of pastes from an account

If you have more, I am open to suggestions!

## Credits

- CodeMyst - [pastemyst](https://github.com/codemyst/pastemyst)

- YilianSource - [pastemyst-ts](https://github.com/YilianSource/pastemyst-ts)

##
Check out the PasteMyst website here: https://paste.myst.rs/