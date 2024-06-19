const Suggestions=()=>{
    return (
        <div className="font-sans text-center">
          <header className="flex justify-between items-center bg-blue-900 text-white p-4">
            <div className="text-2xl">☰</div>
            <div className="text-lg">APP NAME</div>
            <div className="text-2xl">👤</div>
          </header>
          <main className="p-8">
            <h1 className="my-8 text-2xl">Practice makes Perfect!</h1>
            <div className="flex justify-evenly items-center bg-gray-300 my-4 p-6 rounded-lg">
              <div className="text-4xl">📖</div>
              <div className=" w-96"><a href="https://docs.google.com/presentation/d/1XG279048j9HMeOSvxSGFjosrD_anxSA3/edit?usp=drive_link&ouid=101306708515019701631&rtpof=true&sd=true ">Eductional Module</a></div>
            </div>
            <div className="flex justify-evenly items-center bg-gray-300 my-4 p-6 rounded-lg">
              <div className="text-4xl">🎵</div>
              <div className=" w-96"><a href="google.com">Musical Module</a></div>
            </div>
          </main>
        </div>
      );
    
}
export default Suggestions;