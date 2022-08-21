export const Viewer = () => {
  const url = `C:\\Users\\minus\\Desktop\\save\\[竹嶋えく] ささやくように恋を唄う 第01巻\\`;
  const imgID = '0001.jpg';
  return (
    <div className="mx-auto bg-slate-800">
      <img src={url + imgID} alt="" className="object-contain h-screen w-screen" />
    </div>
  );
};
