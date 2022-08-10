import './CardLookup.css'
import cardsDetailsJson from "../../json/cardsDetails.json";
import $ from 'jquery';

const ability = (array, index) => {
    try {
        return array.stats.abilities[index]
    } catch {
        console.log("catch")
        return array.stats.abilities
    }
}

const CardLookup = ()=> {

    $("#card-search-name").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#card-lookup-table tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > - 1)
        });
    });

    return (
        <>
            <hr/>
            <div className="card-lookup-container">
                <h5>CARD LOOKUP</h5>
                <div style={{display: 'flex'}}>
                    <input style={{width: '50%'}} className="w3-input w3-round w3-border w3-padding" type="text" placeholder="search.." id='card-search-name' />
                </div>  
                <table id="card-lookup-table" className="table-bordered w3-hoverable display table table-dark table-striped">
                    <thead>
                        <tr className="w3-dark-grey sticky-table-head">
                            <th>#</th>
                            <th>Card Name</th>
                            <th>ID</th>
                            <th>Lvl 1</th>
                            <th>Lvl 2</th>
                            <th>Lvl 3</th>
                            <th>Lvl 4</th>
                            <th>Lvl 5</th>
                            <th>Lvl 6</th>
                            <th>Lvl 7</th>
                            <th>Lvl 8</th>
                            <th>Lvl 9</th>
                            <th>Lvl 10</th>
                        </tr>
                    </thead>
                    <tbody id='lookup-body'>
                    {cardsDetailsJson.map((a, i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{a.name}</td>
                            <td>{a.id}</td>
                            <td>{ability(a,0)}</td>
                            <td>{ability(a,1)}</td>
                            <td>{ability(a,2)}</td>
                            <td>{ability(a,3)}</td>
                            <td>{ability(a,4)}</td>
                            <td>{ability(a,5)}</td>
                            <td>{ability(a,6)}</td>
                            <td>{ability(a,7)}</td>
                            <td>{ability(a,8)}</td>
                            <td>{ability(a,9)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CardLookup