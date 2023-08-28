import BaseButton, {BaseButtonProps} from "./BaseButton";

export default function TransparentPrimaryButton(props: BaseButtonProps) {
    return <BaseButton {...props} primaryClass="btn-transparent btn-primary-transparent"/>;
}