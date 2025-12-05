import React from 'react'


 function AMC_Plans() {
  return (
    <section id="plans" className="section section-alt">
        <h2>AMC Plans</h2>
        <div className="cards">
          <div className="card">
            <h3>Basic AMC</h3>
            <p>
              Preventive maintenance visits, cleaning, lubrication and basic safety checks.
              Suitable for low-usage residential buildings.
            </p>
            <ul>
              <li>Quarterly inspections</li>
              <li>Basic adjustments</li>
              <li>Emergency call support (chargeable visits)</li>
            </ul>
          </div>

          <div className="card">
            <h3>Standard AMC</h3>
            <p>
              Balanced option covering preventive maintenance plus limited breakdown visits.
              Ideal for apartments and small commercial buildings.
            </p>
            <ul>
              <li>Bi-monthly inspections</li>
              <li>Breakdown visits included (labor)</li>
              <li>Priority response for critical calls</li>
            </ul>
          </div>

          <div className="card">
            <h3>Premium / Comprehensive AMC</h3>
            <p>
              Complete peace of mind with preventive maintenance, breakdown service, and most
              critical spare parts included.
            </p>
            <ul>
              <li>Monthly inspections</li>
              <li>Labor + selected parts included</li>
              <li>24×7 emergency support</li>
            </ul>
          </div>
        </div>
      </section>
  )
}
export default  AMC_Plans
