import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function PrimaryButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-primary"/>;
}