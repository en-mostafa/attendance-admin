
export default function Modal({ ...props }) {
    const {show, close, title, customClass, children} = props 
    
    return (
        <>
        <div onClick={close} className={`modal fade d-block ${show && 'show'}`}  id="kt_modal_stacked_1" aria-modal="true" role="dialog" style={{ visibility : show ? 'visible' : 'hidden' }}>
            <div className={`modal-dialog modal-dialog-centered ${customClass}`} onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">{title}</h3>
                        <div className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close" onClick={close}>
                            <i className="ki-duotone ki-cross fs-1"><span className="path1"></span><span className="path2"></span></i>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
        <div className={`modal-backdrop fade ${!show ? 'd-none' : 'd-block show'}`} ></div>
        </>
    )
}