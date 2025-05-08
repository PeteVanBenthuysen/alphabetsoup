import { Link } from "react-router-dom";

function Visualizations() {
  return (
    <div className="min-h-screen bg-[#C0D6DF] text-[#4F6D7A] px-6 py-16 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 tracking-wide">Data Visualizations</h1>
      <p className="mb-8 max-w-2xl text-lg text-center">
        Explore interactive and static visualizations from my work in quantitative finance, NBA analytics, and CS2 data. 
        <br />
        <span className="text-[#DD6E42] font-semibold">Quantitative Finance</span> visualizations are featured below. NBA and CS2 sections coming soon!
      </p>
      {/* Quant Section */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-semibold mb-2 text-[#DD6E42]">Quantitative Finance</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {/* Replace below with your actual chart or embed */}
          <p className="mb-2 font-medium">Sample: Portfolio Returns Over Time</p>
          <img src="/sample-quant-chart.png" alt="Sample Quant Chart" className="w-full rounded" />
          <p className="text-sm text-[#6A4E42] mt-2">Interactive charts and dashboards coming soon.</p>
        </div>
        {/* Add more quant visualizations here */}
      </section>
      {/* NBA and CS2 sections can be added here later */}
      <div className="mt-8">
        <Link to="/" className="text-[#DD6E42] underline hover:text-[#6A4E42] transition">Back to Home</Link>
      </div>
    </div>
  );
}

export default Visualizations;