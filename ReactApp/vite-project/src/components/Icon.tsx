interface InputProps {
    src: string;
    onClick: React.MouseEventHandler<HTMLImageElement> | undefined;
  }

const Icon = ({src, onClick} : InputProps) => {
    return(
        <img className='logout cursor-pointer w-10 h-10 mt-1' src={src} width="50" onClick={onClick}/>
    )
}

export default Icon