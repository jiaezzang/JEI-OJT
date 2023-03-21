import { ReactNode } from "react";
import '../../src/css/modal.css'

interface Props {
    open: boolean;
    close: React.MouseEventHandler<HTMLButtonElement> | undefined;
    header: string;
    submit: React.MouseEventHandler<HTMLButtonElement> | undefined;
    children?: ReactNode;
  }

const Modal = ({ open, close, header, submit, children }: Props) => {

    return (
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{children}</main>
                    <footer>
                        <button className="submit" onClick={submit}>
                            확인
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default Modal