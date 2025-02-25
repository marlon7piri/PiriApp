import { SiMicrosoftexcel } from "react-icons/si";
<SiMicrosoftexcel />

const ExcelIcon = ({styles='w-4 h-4'}) => {
  return (
    <SiMicrosoftexcel className={styles} size={25}/>
  )
}

export default ExcelIcon