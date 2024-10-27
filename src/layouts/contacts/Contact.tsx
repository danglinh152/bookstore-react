import React, { useState, useEffect } from "react";

function About() {
  const [data, setData] = useState(null); // Dùng useState để lưu trữ dữ liệu từ API

  useEffect(() => {
    // useEffect gọi API khi component được render lần đầu tiên
    fetch(" https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData); // Cập nhật state với dữ liệu từ API
      });
  }, []);
  return (
    <>
      {/* <div className="flex justify-content-between " style={{ height: '600px' }} >
                <div>
                    <form className="block h-50">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div> */}
      <div>
        {data ? (
          <div>{JSON.stringify(data)}</div> // Hiển thị dữ liệu khi có
        ) : (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div> // Hiển thị "Loading..." trong khi đợi dữ liệu
        )}
      </div>
    </>
  );
}

export default About;
