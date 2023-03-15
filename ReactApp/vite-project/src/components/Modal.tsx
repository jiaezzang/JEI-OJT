import React from "react";
import '../../src/css/modal.css'

const Modal = (props: any) => {
    const { open, close, header, submit} = props;

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
                    <main>{props.children}</main>
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