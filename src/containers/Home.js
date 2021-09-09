import React from "react";
import axios from "axios";
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      name: null,
      surname: null,
      statusAdd: false,
      statusEdit: -1,
    };
  }
  componentWillMount = () => {
    this.GetAll();
  };
  GetAll = () => {
    var self = this;
    axios
      .get("http://localhost:3000/students")
      .then(function (response) {
        // handle success
        self.setState({ data: response.data });
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  insertFunction() {
    if (this.state.statusAdd == false) {
      var data = this.state.data;

      const newFirstElement = { id: null, name: null, surname: null };
      const newArray = [newFirstElement].concat(data);
      this.setState({ data: newArray, statusAdd: true });
      console.log(this.state);
    }
  }

  nameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  surnamenameChange = (event) => {
    this.setState({ surname: event.target.value });
  };
  AddFunction(data) {
    var self = this;
    var obj = new Object();
    obj["name"] = this.state.name;
    obj["surname"] = this.state.surname;
    if (this.state.statusEdit > -1) {
      axios
        .put("http://localhost:3000/students/" + data.id, obj)
        .then(function (response) {
          // handle success
          self.setState({ name: null, surname: null, statusEdit: -1 });
          self.GetAll();

          console.log(response);
        })
        .catch(function (error) {
          // handle error
          self.setState({ name: null, surname: null });

          console.log(error);
        });
    } else
      axios
        .post("http://localhost:3000/students", obj)
        .then(function (response) {
          // handle success
          self.setState({ name: null, surname: null, statusAdd: false });
          self.GetAll();

          console.log(response);
        })
        .catch(function (error) {
          // handle error
          self.setState({ name: null, surname: null });

          console.log(error);
        });
  }
  EditFunction = (g, i) => {
    this.setState({ statusEdit: g.id, name: g.name, surname: g.surname });
    if (this.state.statusAdd) {
      var arr = this.state.data;
      var theRemovedElement = arr.shift(); // theRemovedElement == 1
      this.setState({ statusAdd: false, data: arr });
    }
  };
  render() {
    var { data } = this.state;
    console.log("ddd", data);
    return (
      <div className="container">
        <div>
          <button
            onClick={() => this.insertFunction()}
            disabled={this.state.statusEdit != -1}
          >
            Add
          </button>

          <table>
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th></th>
            </thead>
            <tbody>
              {data.map((g, i) => (
                <tr key={i}>
                  <td>{g.id}</td>
                  <td>
                    {!(g.name == null || this.state.statusEdit == g.id) ? (
                      g.name
                    ) : (
                      <input
                        name="name"
                        value={this.state.name}
                        onChange={this.nameChange}
                      ></input>
                    )}
                  </td>
                  <td>
                    {!(g.surname == null || this.state.statusEdit == g.id) ? (
                      g.surname
                    ) : (
                      <input
                        name="surname"
                        value={this.state.surname}
                        onChange={this.surnamenameChange}
                      ></input>
                    )}
                  </td>
                  <td>
                    {g.surname == null && g.name == null ? (
                      <button onClick={() => this.AddFunction(null)}>
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={
                          this.state.statusEdit != g.id
                            ? () => this.EditFunction(g, i)
                            : () => this.AddFunction(g)
                        }
                      >
                        {this.state.statusEdit == g.id ? "Save" : "Edit"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Home;
