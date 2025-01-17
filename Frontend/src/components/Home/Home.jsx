import { Link } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaListUl } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
  return (
    <div>
    <Navbar />
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <div className="container py-5 text-center">
        <div className="mb-5">
         
          <h1 className="display-4 fw-bold text-dark mb-3">
            Organize Your Life with{' '}
            <span className="text-primary">TaskMaster</span>
          </h1>
          <p className="lead text-secondary mb-3">
            The simple, powerful way to manage your daily tasks and boost productivity. Join thousands of users who have transformed their workflow.
          </p>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to="/signup"
              className="btn btn-primary btn-lg px-4 py-3 rounded-pill shadow"
            >
              Get Started - It's Free
            </Link>
            <Link
              to="/signin"
              className="btn btn-outline-secondary btn-lg px-4 py-3 rounded-pill"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow text-center p-4">
              <div className="icon-circle bg-light text-primary mx-auto mb-3">
                <FaCheckCircle size={32} />
              </div>
              <h5 className="fw-bold">Stay Organized</h5>
              <p className="text-muted">
                Keep all your tasks in one place with our intuitive interface.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow text-center p-4">
              <div className="icon-circle bg-light text-primary mx-auto mb-3">
                <FaClock size={32} />
              </div>
              <h5 className="fw-bold">Set Priorities</h5>
              <p className="text-muted">
              Keep track of what's most important. Organize your tasks by priority.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow text-center p-4">
              <div className="icon-circle bg-light text-primary mx-auto mb-3">
                <FaListUl size={32} />
              </div>
              <h5 className="fw-bold"> My Tasks</h5>
              <p className="text-muted">
              See all your tasks at a glance. Don't miss anything!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <h2 className="fw-bold">10k+</h2>
              <p>Active Users</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold">99%</h2>
              <p>Satisfaction Rate</p>
            </div>
            <div className="col-md-4">
              <h2 className="fw-bold">50k+</h2>
              <p>Tasks Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
