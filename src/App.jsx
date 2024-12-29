import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://www.course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setisLoading] = useState(true);
  const [tours, setTours] = useState([]) ;

  const removeTour =(id)=>{
    const deletedTour = tours.filter((tour) => tour.id !== id)
    setTours(deletedTour)
   }
  const fetchTours = async () => {
    setisLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      console.log(tours);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false)
  };

  
  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return <main>
      <Loading />
    </main>
  }
  if (tours.length ===0) {
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button type="button" style={{marginTop: '2rem'}} className="btn" onClick={()=> fetchTours()}>
          refresh
        </button>
      </div>
    </main>
  }
  
  return <main>
    <Tours tours = {tours} removeTour={removeTour}/>
  </main>;
};
export default App;
