import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
function Widgets() {
  const newArticle = (heading, subtitle) => {
    return (
      <div className="widgets__article">
        <div className="widgets__articleLeft">
          <FiberManualRecordIcon />
        </div>
        <div className="widgets__articleRight">
          <h4>{heading}</h4>
          <p>{subtitle}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>Linkedin News</h2>
        <InfoIcon />
      </div>
      {newArticle("AI hiring surges across startups", "Top news - 14,200 readers")}
      {newArticle("Remote work remains a priority", "Trending in tech - 8,740 readers")}
      {newArticle("India's startup funding rebounds", "Business - 6,110 readers")}
      {newArticle("Developers embrace AI tools", "Career growth - 5,890 readers")}
      {newArticle("Global markets steady after rally", "Finance - 11,340 readers")}
    </div>
  );
}

export default Widgets;
