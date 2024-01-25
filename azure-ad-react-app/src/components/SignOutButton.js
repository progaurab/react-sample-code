import React from "react";
import { useMsal } from "@azure/msal-react";

function SignOutButton() {
    const { instance } = useMsal();

    return (
        <button onClick={() => instance.logoutPopup()}>Sign Out</button>
    );
}

export default SignOutButton;
