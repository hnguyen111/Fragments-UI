import {Select} from "antd";
import {useRecoilState} from "recoil";
import fragmentMimeTypeState from "../../../../stores/dashboard/fragment/fragment-mime-type.state";

const {Option} = Select;

interface Props {
    defaultValue: string,
    types: string[];
}

export default function FragmentMimeType({defaultValue, types}: Props) {
    const [, setType] = useRecoilState(fragmentMimeTypeState);

    return <Select
        defaultValue={defaultValue}
        onChange={(value) => {setType(value);}}
        style={{width: "100%"}}
    >
        {types.map((type, index) => (
            <Option key={index} value={type}>
                {type}
            </Option>
        ))}
    </Select>;
}