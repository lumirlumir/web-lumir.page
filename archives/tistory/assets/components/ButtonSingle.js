import './ButtonSingle.scss';

export default function ButtonSingle(props) {
  /* Variables */
  const { children, click, title, position, top, right, bottom, left } = props;
  const style = { title, position, top, right, bottom, left };

  /* Return */
  return (
    <div className="ButtonSingle" style={style}>
      <button
        title={title}
        type="button"
        onClick={() => {
          click();
        }}
      >
        {children}
      </button>
    </div>
  );
}
