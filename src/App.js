import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      keyword: "",
      sortBy: []
    }
  }
  componentDidMount() {
    fetch('https://data.ratp.fr/api/records/1.0/search/?rows=40&disjunctive.code_postal=true&sort=code_postal&start=80&dataset=liste-des-commerces-de-proximite-agrees-ratp&timezone=Asia%2FJakarta')
      .then((Response) => Response.json())
      .then((findres) => {
        console.log("findRes", findres)
        this.setState({
          persons: findres.records,
        })
      })
  }
  renderItem(criteria, index) {
    // console.log("renderItem", criteria)
    return (
      <React.Fragment>
        <td>{index + 1}</td>
        <td>
          {criteria.fields.tco_libelle}
        </td>
        <td>{criteria.fields.dea_fermeture}</td>
        <td>{criteria.fields.dea_numero_rue_livraison_dea_rue_livraison}</td>
        <td>{criteria.fields.ville}</td>
        <td>{criteria.fields.code_postal}</td>
      </React.Fragment>
    )
  }
  render() {
    console.log("dk", this.state.persons)
    return (
      <div>
        <table id="example" className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Index</th>
              <th>Commerce</th>
              <th>Dea fermeture</th>
              <th>Address</th>
              <th>Ville</th>
              <th>Code postal</th>
            </tr>
          </thead>
          <tbody>
            {this.state.persons.map((criteria, index) => {
              return (
                <tr id={criteria.id} key={criteria.id}>
                  {this.renderItem(criteria, index)}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;