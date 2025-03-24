import closeIcon from "../../assets/icons/x.svg";

interface PopupProps {
  content: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ content, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <div
          className="pd-2 absolute top-6 right-6 cursor-pointer"
          onClick={onClose}
        >
          <img src={closeIcon} className="w-4 h-4" />
        </div>
        {content}
      </div>
    </div>
  );
};

export default Popup;
