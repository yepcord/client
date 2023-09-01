import React, {useState} from "react";
import ApiClient, {ErrorResponse} from "../../../../../api/client";
import {Divider} from "@mui/material";
import TransparentSecondaryButton from "../../../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../../../ui/PrimaryButton";
import {DialogProps} from "./index";

interface EditEmailDialogErrors {
    email?: string,
    password?: string,
}

export default function EditEmailDialog({close}: DialogProps) {
    const [form, setForm] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({} as EditEmailDialogErrors);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field_name = e.target.name;
        setForm({
            ...form,
            [field_name]: e.target.value,
        });
        setErrors({});
    }

    const handleSubmit = () => {
        setErrors({});
        ApiClient.editMe(form).then(resp => {
            if (resp.status === 200) {
                close();
            }
            if (resp.body === null || resp.status >= 500) {
                setErrors({"email": "Server error, try again.", "password": "Server error, try again."})
                return;
            }
            if (resp.status >= 400 && resp.status <= 499) {
                const resp_errors = (resp.body as ErrorResponse).errors!;
                const errors = {} as EditEmailDialogErrors;
                if ("email" in resp_errors)
                    errors["email"] = resp_errors["email"]["_errors"][0]["message"];
                if ("password" in resp_errors)
                    errors["password"] = resp_errors["password"]["_errors"][0]["message"];

                setErrors(errors);
            }
        })
    }

    const emailErr = () => errors.email ? " - " + errors.email : null;
    const passwordErr = () => errors.password ? " - " + errors.password : null;

    return (
        <div className="edit-settings-dialog">
            <div className="center">
                <h2 className="text-main">Enter an email address</h2>
                <span className="text-secondary">Enter a new email address and your existing password.</span>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

            <div className="input-container">
                <label style={{color: emailErr() ? "red" : ""}} className="text-secondary">
                    Email
                    <span className="required-asterisk">{emailErr()}</span>
                </label>
                <input name="email" type="email" className="input-primary" onChange={handleFormChange} required={true}/>
            </div>

            <div className="input-container">
                <label style={{color: passwordErr() ? "red" : ""}} className="text-secondary">
                    Current password
                    <span className="required-asterisk">{passwordErr()}</span>
                </label>
                <input name="password" type="password" className="input-primary" onChange={handleFormChange}
                       required={true}/>
            </div>

            <div className="edit-settings-dialog-bottom-buttons">
                <TransparentSecondaryButton onClick={close}>Back</TransparentSecondaryButton>
                <PrimaryButton onClick={handleSubmit}>Done</PrimaryButton>
            </div>
        </div>
    )
}