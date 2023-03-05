import { Link } from 'react-router-dom'

const Landing = () => {
    return (
<div>
  {/* Section: Design Block */}
  <section className="max-h-screen">
    <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{backgroundPosition: '50%', backgroundImage: 'url("https://mdbcdn.b-cdn.net/img/new/slides/146.webp")', height: 500}}>
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" style={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
        <div className="flex justify-center items-center h-full">
          <div className="text-center text-white px-6 md:px-12">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
              The one-stop mail toolkit<br /><span>for content creators</span>
            </h1>
            <Link to="/dashboard" className="inline-block px-7 py-3 border-2 border-white text-white font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Section: Design Block */}
</div>

    );
}

export default Landing