import React, { useState, useEffect } from "react";
import Card from "./Card";
import JSON from "./Data/City.json";
const Fetchdata = () => {
  let [data, setData] = useState("");
  let [search, setSearch] = useState("");
  let [issubmit, setIssubmit] = useState(false);
  let API_KEY = "99fe974a6ee8343860744492525bd18c";
  let Getdata;
  useEffect(() => {
    if (issubmit) {
      Getdata = async () => {
        await fetch(
          `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${search}`
        )
          .then(res1 =>
            res1
              .json()
              .then(res => {
                setData([res]);
                console.log(res);
              })
              .catch(err => console.log(err))
          )
          .catch(error => console.log(error));
      };
      Getdata();
    }
    setIssubmit(false);
  }, [issubmit]);

  let handleSubmit = e => {
    e.preventDefault();
    setIssubmit(true);
    console.log("submiiting");
  };
  return (
    <section className="main-Block">
      <article>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search here....."
            name="search"
            onChange={e => {
              setSearch(e.target.value);
            }}
            list="city"
          />

          <datalist id="city">
            {JSON.map(value => {
              return <option>{value.name}</option>;
            })}
          </datalist>
          <button>Get Data</button>
        </form>

        {data ? (
          <Card
            name={data[0].location.name}
            ob_time={data[0].current.observation_time}
            temp={data[0].current.temperature}
            img={data[0].current.weather_icons[0]}
            w_descrip={data[0].current.weather_descriptions[0]}
            uv={data[0].current.uv_index}
            wind={data[0].current.wind_speed}
            precip={data[0].current.precip}
            humidity={data[0].current.humidity}
            visibility={data[0].current.visibility}
            is_day={data[0].current.is_day}
            date_time={data[0].location.localtime}
          ></Card>
        ) : (
          ""
        )}
      </article>
    </section>
  );
};

export default Fetchdata;
