import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Castform = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const PersonalInformation = () => (
    <div className="pt-5 px-5">
      <h1 className="text-2xl font-bold">
        {data.profile.firstName} {data.profile.lastName}
      </h1>
      <h5>{data.profile.subtitle}</h5>
    </div>
  );

  const Heading = ({ title, light = false }) => (
    <div
      className={`py-2 my-4 ${light ? 'mx-5 border-t border-b border-gray-400' : ''}`}
      style={{ backgroundColor: light ? '' : 'rgba(0, 0, 0, 0.25)' }}
    >
      <h6 className={`${light ? '' : 'pl-5'} font-semibold`}>{title}</h6>
    </div>
  );

  const Address = () => (
    <div className="px-5 my-2">
      <h6 className="text-xs font-bold">Address</h6>
      <div className="text-sm">{data.profile.address.line1}</div>
      <div className="text-sm">{data.profile.address.line2}</div>
      <div className="text-sm">{data.profile.address.line3}</div>
    </div>
  );

  const ContactItem = ({ title, value, link = '#' }) =>
    value && (
      <div className="px-5 my-2">
        <h6 className="text-xs font-bold">{title}</h6>
        <a href={link}>
          <div className="text-sm">{value}</div>
        </a>
      </div>
    );

  const ContactInformation = () => (
    <div>
      <Heading title="Contact Information" />
      <Address />
      <ContactItem title="Phone" value={data.profile.phone} link={`tel:${data.profile.phone}`} />
      <ContactItem
        title="Email Address"
        value={data.profile.email}
        link={`mailto:${data.profile.email}`}
      />
      <ContactItem
        title="Website"
        value={data.profile.website}
        link={`http://${data.profile.website}`}
      />
    </div>
  );

  const SkillItem = x => (
    <li key={x} className="text-sm my-2">
      {x}
    </li>
  );

  const Skills = () =>
    data.skills.enable && (
      <div>
        <Heading title="Skills" />
        <ul className="list-none px-5">{data.skills.items.map(SkillItem)}</ul>
      </div>
    );

  const Objective = () =>
    data.objective.enable && <p className="m-5 text-sm">{data.objective.body}</p>;

  const WorkItem = x => (
    <div key={x.title} className="my-3 px-5">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.title}</h6>
          <p className="text-xs">{x.role}</p>
        </div>
        <span className="text-xs font-medium">
          ({x.start} - {x.end})
        </span>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Work = () =>
    data.work.enable && (
      <div>
        <Heading light title={data.work.heading} />
        {data.work.items.map(WorkItem)}
      </div>
    );

  const ReferenceItem = x => (
    <div key={x.id} className="flex flex-col">
      <h6 className="text-sm font-medium">{x.name}</h6>
      <span className="text-xs">{x.position}</span>
      <span className="text-xs">{x.phone}</span>
      <span className="text-xs">{x.email}</span>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const References = () =>
    data.references.enable && (
      <div>
        <Heading light title={data.references.heading} />
        <div className="grid grid-cols-2 gap-6 px-5">
          {data.references.items.map(ReferenceItem)}
        </div>
      </div>
    );

  const LanguageItem = x => (
    <div key={x.id} className="flex flex-col my-2">
      <h6 className="text-sm font-medium mb-1">{x.key}</h6>
      <div className="relative h-5">
        <div
          className="absolute mb-1 inset-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
          }}
        />
        <div
          className="absolute mb-1 inset-0 rounded"
          style={{
            width: `${x.value * 20}%`,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>
    </div>
  );

  const Languages = () =>
    data.languages.enable && (
      <div>
        <Heading title={data.languages.heading} />
        <div className="px-5 mb-6">{data.languages.items.map(LanguageItem)}</div>
      </div>
    );

  const EducationItem = x => (
    <div key={x.name} className="my-3 px-5">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.name}</h6>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold">{x.grade}</span>
          <span className="text-xs font-medium">
            ({x.start} - {x.end})
          </span>
        </div>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Education = () =>
    data.education.enable && (
      <div>
        <Heading light title={data.education.heading} />
        {data.education.items.map(EducationItem)}
      </div>
    );

  const AwardItem = x => (
    <div key={x.title} className="my-3 px-5">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Awards = () =>
    data.awards.enable && (
      <div>
        <Heading light title={data.awards.heading} />
        {data.awards.items.map(AwardItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.title} className="my-3 px-5">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Certifications = () =>
    data.certifications.enable && (
      <div>
        <Heading title={data.certifications.heading} />
        {data.certifications.items.map(CertificationItem)}
      </div>
    );

  const ExtraItem = ({ key, value }) => (
    <div className="px-5 my-2">
      <h6 className="text-xs font-bold">{key}</h6>
      <div className="text-sm">{value}</div>
    </div>
  );

  const Extras = () =>
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        {data.extras.items.map(ExtraItem)}
      </div>
    );

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-12">
        <div
          className="col-span-4 rounded"
          style={{
            color: theme.colors.background,
            backgroundColor: theme.colors.accent,
          }}
        >
          <div className="mt-5 ml-5">
            <img
              className="w-32 h-32 rounded-full"
              style={{
                borderWidth: 6,
                borderColor: theme.colors.background,
              }}
              src={data.profile.photo}
              alt="Profile Photograph"
            />
          </div>
          <PersonalInformation />
          <ContactInformation />
          <Skills />
          <Languages />
          <Certifications />
          <Extras />
        </div>
        <div className="col-span-8">
          <Objective />
          <Work />
          <Education />
          <Awards />
          <References />
        </div>
      </div>
    </div>
  );
};

export default Castform;
