export default function FrontHome() {
  return<>
    <header
    className="container header px-4 py-5 d-flex align-items-lg-center justify-content-center"
    style={{"backgroundImage": `url('https://images.unsplash.com/photo-1601409751311-cbecfe223af4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`}} >
      <div className="text-white text-center">
        <p className="fs-5">美味與創意的完美結合</p>
        <h1 className="fw-bold">感受心情的甜蜜味道</h1>
        <p>享受濃濃甜蜜，讓口感瞬間躍動<br />
        融入多重層次的滋味<br />
        品嚐我們的蛋糕，感受一口完美的享受！
        </p>
      </div>
    </header>  
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 mt-md-4">
          <div className="card border-0 mb-4">
            <img
              src="https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              className="card-img-top rounded-0 object-cover"
              height={250}
              alt="..."
            />
            <div className="card-body text-center">
              <h4>蘋果派</h4>
              <div className="d-flex justify-content-center">
                <p className="card-text text-muted mb-0">
                  口感酥脆，內餡甜蜜，加入肉桂和檸檬汁，風味獨特。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-md-4">
          <div className="card border-0 mb-4">
            <img
              src="https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              className="card-img-top rounded-0 object-cover"
              height={250}
              alt="..."
            />
            <div className="card-body text-center">
              <h4>水果蛋糕</h4>
              <div className="d-flex justify-content-center">
                <p className="card-text text-muted mb-0">
                  果香四溢，綿密蛋糕搭配新鮮水果，口感爽口。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-md-4">
          <div className="card border-0 mb-4">
            <img
              src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              className="card-img-top rounded-0 object-cover"
              height={250}
              alt="..."
            />
            <div className="card-body text-center">
              <h4>杯子蛋糕</h4>
              <div className="d-flex justify-content-center">
                <p className="card-text text-muted mb-0">
                精緻迷你，個個不同口感，杯裝方便，好拍好吃。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-light mt-7">
      <div className="container">
        <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <h3 className="text-center pt-4">顧客評價</h3>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <div className="row justify-content-center pt-3 pb-5">
                <div className="col-md-6 text-center">
                  <div className="align-self-center">
                      <p className="mb-3">「忙碌中的小確幸，一口蛋糕方便攜帶，隨時品嚐美好。」</p>
                      <p><small>—某公司的上班族—</small></p>
                  </div>
                </div>              
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <div className="row justify-content-center pt-3 pb-5">
                <div className="col-md-6 text-center">
                  <div className="align-self-center">
                      <p className="mb-3">「新鮮水果，清甜可口。口感綿密，輕鬆享受健康美食。」</p>
                      <p><small>—隔壁的阿土伯—</small></p>
                  </div>
                </div>              
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center  pt-3 pb-5">
                  <div className="align-self-center">
                      <p className="mb-3">「巧克力好好吃，濃郁又香甜。來跟小明一起分享！」</p>
                      <p><small>—剛下課的小學生—</small></p>
                  </div>
                </div>              
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>      
      </div>
    </div>
    <div className="container my-7">
      <div className="row">
        <div className="col-md-6">
          <img src="https://images.unsplash.com/photo-1562023692-18827bd11f4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" height={250} alt="" className="img-fluid object-cover" />
        </div>
        <div className="col-md-4 m-auto text-center">
          <h4 className="mt-4">美好時光</h4>
          <p className="text-muted">美味的蛋糕，口感鬆軟，讓你享受甜蜜時光。</p>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-between mt-4">
        <div className="col-md-6">
          <img src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80" height={250} alt="" className="img-fluid object-cover" />
        </div>
        <div className="col-md-4 m-auto text-center">
          <h4 className="mt-4">奢華美味</h4>
          <p className="text-muted">手作蛋糕，嚴選食材，味蕾驚艷</p>
        </div>
      </div>
    </div>
  </>
}