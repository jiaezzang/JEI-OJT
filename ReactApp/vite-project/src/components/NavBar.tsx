import Icon from './Icon'
interface NavBarProps {
    src1: string;
    src2: string;
    onClick1?: React.MouseEventHandler<HTMLImageElement> | undefined;
    onClick2?: React.MouseEventHandler<HTMLImageElement> | undefined;
    name: string;
}
const NavBar = ({name, src1, src2, onClick1, onClick2}: NavBarProps) => {
    return (
        <div className="max-w-screen-lg flex flex-row justify-between" style={{width: '150%', justifyContent: 'space-around'}}>
          <h1 className="font-bold mr-2 text-xl md:text-2xl lg:text-3xl justify-contentflex-start">안녕 {name}</h1>
          <div className="flex justify-contantflex-end space-x-2">
            <Icon src={src1} onClick={onClick1}></Icon>
            <Icon src={src2} onClick={onClick2}></Icon>
          </div>
        </div>
    )
}

export default NavBar