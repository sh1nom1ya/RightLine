using AutoMapper;
using RightLine.Api.Dtos;
using RightLine.Api.Dtos.Auth;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Mappers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserRegistrationDto, User>()
            .ForMember(u => u.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(u => u.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber));

        
        CreateMap<User, ProfileDto>();
    }
}