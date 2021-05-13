# vscode-pastemyst

PasteMyst is a simple website for sharing code - Now as a Visual Studio Code extension.

This extension provides a way to paste to the website without leaving your IDE.

# Features

- Paste creation. You can create a paste with a few clicks.
    - Select single or multiple files
    - Select snippets of code from different files
    - Set custom title for the paste
    - Set the expiration for the paste
    - Once created, you will be given a link to the created paste

- Paste retrieval. You can retrieve pastes from the website via its paste ID.
    - Once retrieved you will be given readonly versions of the retrieved pasted files
    - These files will not be saved - they are for viewing only

## Note
- You can optionally provide an authorization token. This token will allow you to access features only available to those who have a pastemyst account:
    - Retrieve private pastes from your account
    - Create pastes and send them to your account

# Known Issues
- Retrieving a paste may a bit wonky. This is being tested.
- When a paste is made, the language is set to "autodetect" by default. This will output the wrong language on the website. This is an ongoing issue on PasteMyst. A workaround is in the works. This does not affect paste content.

# Planned Features
- The ability to edit pastes

### Credits

- [CodeMyst](https://github.com/CodeMyst) - PasteMyst

- [YilianSource](https://github.com/yiliansource) - API Wrapper

####
Check out the PasteMyst website here: https://paste.myst.rs/