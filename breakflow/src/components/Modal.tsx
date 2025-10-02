type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-black opacity-50 bg-[var(--bg-surface)]" onClick={onClose} />
      <div className=" rounded-lg shadow-lg z-10 p-6 bg-[var(--bg-surface)] flex flex-col max-w-xl w-full mx-4 md:mx-auto">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold text-[var(--theme-success)]">{title}</h3>
        <button className=" text-[var(--text-primary)] self-end text-5xl" onClick={onClose}>
          &times;
        </button>
        </div>
        {children}
      </div>
    </div>
  );
}
