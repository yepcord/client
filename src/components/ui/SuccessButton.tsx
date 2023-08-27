import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function SuccessButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-success"/>;
}