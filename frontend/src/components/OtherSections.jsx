const OtherSections = () => {
  return (
    <>
      <div className="container-fluid __idea">
        <div className="idea d-flex justify-content-center align-items-center">
          <div className="image w-50 d-flex flex-column flex-md-row justify-content-center">
            <img
              className="w-100 h-100"
              src="https://s.pinimg.com/webapp/center-2d76a691.png"
              alt=""
            />
            <input
              type="text"
              className="input__ fw-bold fs-3 px-5"
              value={"Easy Chicken Dinner"}
            />
          </div>
          <div className="details w-50 text-center">
            <h3 className="fw-bold h3 display-2"> Search For Ideas</h3>
            <div className="p px-5 mx-5 ">
              What do you want to try next? Think of something you’re into—like
              “easy chicken dinner”—and see what you find.
            </div>
            <div className=" explore">Explore</div>
          </div>
        </div>
      </div>
      <div className="container-fluid signup">
        <div className="container">
          <div className="row text-light">

            <div className="col-md-6 ">
              <div className="content w-100 h-100 d-flex  align-items-center ">
              <div className="details d-flex flex-column ">
                <span>Sign Up to </span>
                <span>Get Your  </span>
                <span>Ideas </span>
              </div>
              </div>
            </div>
            <div className="col-md-6">

              <div className="form d-flex flex-column">
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
                <input type="text" className="form-group" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherSections;
