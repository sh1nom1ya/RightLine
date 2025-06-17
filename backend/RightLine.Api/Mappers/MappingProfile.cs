using AutoMapper;
using RightLine.Api.Dtos;
using RightLine.DataAccess.Models;

namespace RightLine.Api.Mappers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserRegistrationDto, User>()
            .ForMember(u => u.UserName, options => options
                .MapFrom(x => x.Email));
    }
}