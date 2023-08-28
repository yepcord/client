import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function TransparentSuccessButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-transparent btn-success-transparent"/>;
}