//assuming the database is a MySQL database...
import knex from 'knex'; //using knew query builder
import { getShiftsByFacility, generateReport } from '/path/to/module';

class TicketBreakdown {

    constructor(facilityId) {
        this.facilityId = facilityId;
    }

    getAgentShifts() {
        return getShiftsByFacility(this.facilityId);
    }

    getAgentDetails(agentId) {
        let details;
        const shifts = this.getAgentShifts();
        shifts.map( agent => {
            if (agent.id === agentId) {
                details = agent;
            }
        })
        return details;
    }

    updateAgentId(agentId) {
        //check if agentId already exist before modifying agent id field
        knex('Agents').where('id', agentId).update({id: agentId});
        return agentId;
    }

    generate(agentId, newAgentId = null) {

        agentId = newAgentId ? this.updateAgentId(newAgentId) : agentId;
        const details = this.getAgentDetails(agentId);
        const { name, email, phone_number, address, acceptance_criteria, time_estimates, implementation_details } = details;
        return {
            name,
            email,
            phone_number,
            address,
            acceptance_criteria,
            time_estimates,
            implementation_details
        }

    }

}

const facilityId = 29;
const ticket = new TicketBreakdown(facilityId);

const ticket1 = ticket.generate(23);
const ticket2 = ticket.generate(45, 89); //change agent ID
const ticket3 = ticket.generate(12);
const ticket4 = ticket.generate(94, 78); //change agent ID
const ticket5 = ticket.generate(28);