import PerkItem from "../designpattern/composite/PerkItem";
import PerksData from "./PerksData";
export default function Perks({selected, onChange }) {
  const perksData = PerksData();
  function handlePerkChange(perkName) {
    if (selected.includes(perkName)) {
      onChange(selected.filter((name) => name !== perkName));
    } else {
      onChange([...selected, perkName]);
    }
  }
  return (
    <>
      {perksData.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h2>{group.groupName}</h2>
          {group.perks.map((perk, perkIndex) => (
            <PerkItem
              key={perkIndex}
              name={perk.name}
              path={perk.path}
              selected={selected.includes(perk.name)}
              onChange={handlePerkChange}
            />
          ))}
        </div>
      ))}
    </>
  );
  
}
