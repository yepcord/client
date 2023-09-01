import React, {useState} from "react";
import ApiClient, {ErrorResponse} from "../../../../../api/client";
import {Divider} from "@mui/material";
import TransparentSecondaryButton from "../../../../ui/TransparentSecondaryButton";
import PrimaryButton from "../../../../ui/PrimaryButton";
import {DialogProps} from "./index";

interface EditPasswordDialogErrors {
    password?: string,
    new_password?: string,
    confirm_new_password?: string,
}

export default function EditPasswordDialog({close}: DialogProps) {
    const [form, setForm] = useState({password: "", new_password: "", confirm_new_password: ""});
    const [errors, setErrors] = useState({} as EditPasswordDialogErrors);
    const [loading, setLoading] = useState(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field_name = e.target.name;
        const new_form = {
            ...form,
            [field_name]: e.target.value,
        }
        setForm(new_form);
        const err = {} as EditPasswordDialogErrors;
        if (new_form.new_password !== new_form.confirm_new_password)
            err["confirm_new_password"] = err["new_password"] = "Passwords do not match."
        setErrors(err);
    }

    const handleSubmit = () => {
        if (loading) return;
        setLoading(true);
        setErrors({});
        ApiClient.editMe({password: form.password, new_password: form.new_password}).then(resp => {
            setLoading(false);
            if (resp.status === 200) {
                close();
            }
            if (resp.body === null || resp.status >= 500) {
                setErrors({
                    "password": "Server error, try again.",
                    "new_password": "Server error, try again.",
                    "confirm_new_password": "Server error, try again."
                })
                return;
            }
            if (resp.status >= 400 && resp.status <= 499) {
                const resp_errors = (resp.body as ErrorResponse).errors!;
                const errors = {} as EditPasswordDialogErrors;
                if ("password" in resp_errors)
                    errors["password"] = resp_errors["password"]["_errors"][0]["message"];
                if ("new_password" in resp_errors)
                    errors["confirm_new_password"] = resp_errors["new_password"]["_errors"][0]["message"];

                setErrors(errors);
            }
        })
    }

    const passwordErr = () => errors.password ? " - " + errors.password : null;
    const newPasswordErr = () => errors.new_password ? " - " + errors.new_password : null;
    const newPassword2Err = () => errors.confirm_new_password ? " - " + errors.confirm_new_password : null;

    return (
        <div className="edit-settings-dialog">
            <div className="center">
                <h2 className="text-main">Enter an email address</h2>
                <span className="text-secondary">Enter a new email address and your existing password.</span>
            </div>

            <Divider flexItem sx={{borderBottomWidth: "2px", backgroundColor: "#3b3b3b", margin: "10px 0"}}/>

            <div className="input-container">
                <label style={{color: passwordErr() ? "red" : ""}} className="text-secondary">
                    Current password
                    <span className="required-asterisk">{passwordErr()}</span>
                </label>
                <input name="password" type="password" className="input-primary" onChange={handleFormChange}
                       required={true} disabled={loading}/>
            </div>

            <div className="input-container">
                <label style={{color: newPasswordErr() ? "red" : ""}} className="text-secondary">
                    New password
                    <span className="required-asterisk">{newPasswordErr()}</span>
                </label>
                <input name="new_password" type="password" className="input-primary" onChange={handleFormChange}
                       required={true} disabled={loading}/>
            </div>

            <div className="input-container">
                <label style={{color: newPassword2Err() ? "red" : ""}} className="text-secondary">
                    Confirm new password
                    <span className="required-asterisk">{newPassword2Err()}</span>
                </label>
                <input name="confirm_new_password" type="password" className="input-primary" onChange={handleFormChange}
                       required={true} disabled={loading}/>
            </div>

            <div className="edit-settings-dialog-bottom-buttons">
                <TransparentSecondaryButton onClick={close} disabled={loading}>Cancel</TransparentSecondaryButton>
                <PrimaryButton onClick={handleSubmit} disabled={loading}>Done</PrimaryButton>
            </div>
        </div>
    )
}