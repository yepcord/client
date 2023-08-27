import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function DangerButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-danger"/>;
}