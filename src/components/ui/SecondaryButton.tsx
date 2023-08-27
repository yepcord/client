import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function SecondaryButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-secondary"/>;
}