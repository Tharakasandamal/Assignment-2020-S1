package com.telusko.demorest.Controllers;
import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.telusko.demorest.model.AppointmentDetailsModule;
import com.telusko.demorest.model.DoctorModel;
import com.telusko.demorest.services.AppointmentDetailsRepository;
import com.telusko.demorest.services.DoctorRepository;

@Path("userlogin")
public class UserController {
	AppointmentDetailsRepository appointmentRepo=new AppointmentDetailsRepository();
	DoctorRepository docRepo=new DoctorRepository();
	
	
	
	//Appointment Controllers-------------------------------------------------------------------------------------------------------------
	
	@Path("appointment")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDetailsModule> getAppointments() throws SQLException {
		return appointmentRepo.getAppointments();
	}

	@Path("appointment/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDetailsModule> getAppointmentsByUser(@PathParam("id") int id) throws SQLException {
		return appointmentRepo.getAppointmentsByUser(id);
	}
	@Path("appointmentByDoc/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDetailsModule> getAppointmentsByDoc(@PathParam("id") int id) throws SQLException {
		return appointmentRepo.getAppointmentsByDoc(id);
	}
	
	@Path("appointment")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppointmentDetailsModule CreateAppointment(AppointmentDetailsModule a) throws SQLException {		
		return appointmentRepo.createAppointment(a);
	}
	@Path("appointment")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public AppointmentDetailsModule UpdateAppointment(AppointmentDetailsModule a) throws SQLException {
	
			appointmentRepo.updateAppointment(a);
		
		return a;
	}
	
	//Doctor Controllers------------------------------------------------------------------------------------------------------------------
	
	@Path("doctor")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<DoctorModel> getDoctors() throws SQLException {
		return docRepo.getDoctors();
	}

	@Path("doctor/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public DoctorModel getDoctor(@PathParam("id") int id) throws SQLException {
		return docRepo.getDoctor(id);
	}
	
	@Path("doctorByHsptl/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<DoctorModel> getDoctorsByHosptl(@PathParam("id") int id) throws SQLException {
		return docRepo.getDoctorByHospital(id);
	}

	
}
