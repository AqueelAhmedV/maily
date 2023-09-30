import { Link } from 'react-router-dom'

const Landing = () => {
    return (
<div>
  {/* Section: Design Block */}
  <section className="max-h-screen z-1 absolute top-0 left-0 right-0 bottom-0 select-none">
    <div className=" overflow-hidden bg-no-repeat bg-cover landing-section bg-black h-full"> 
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed" style={{backgroundColor: 'rgba(0, 0, 0, 0.69)'}}>
        <div className="flex justify-center items-center h-full">
          <div className="text-center text-white px-6 md:px-12">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 select-none" style={{
              filter: "drop-shadow(0 0 50px #fff)"
            }}>
              The one-stop <span className=' from-primary to-danger text-transparenttext-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-red-200 to-purple-600'>mail toolkit</span><br /><span>for content creators</span>
            </h1>

            <Link to="/dashboard" className="border-white bg-transparent hover:bg-white hover:text-gray-800 text-xl text-white py-3 px-5 font-semibold border-2 rounded-md shadow-md hover:color-black hover:shadow-lg transition duration-300 ease-in-out" >
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