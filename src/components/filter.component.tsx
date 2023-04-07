import styled from "styled-components";

const Container = styled("div")`
  display: flex;
  margin-top: 40px;
  font-size: 14px;
`;

type ByProps = {
  selected?: boolean;
  "data-name": string;
};
const By = styled("span")<ByProps>`
  color: ${(props) => (props.selected ? "#1f2a4b" : "#4a77e5")};
  cursor: pointer;
  text-decoration: ${(props) => (props.selected ? "none" : "underline")};
  margin: 0 5px 0 10px;
`;

const Title = styled.span`
  padding: 0px 7px 0 0;
  font-size: 14px;
  color: rgba(31, 42, 75, 0.59);
`;

type FilterProps = {
  selected: string;
  handleFilterChange: (e: any) => void;
};
const FilterComponent = ({ handleFilterChange, selected }: FilterProps) => {
  return (
    <Container>
      <Title>Show:</Title>

      <By
        onClick={handleFilterChange}
        data-name="All"
        selected={selected === "All"}
      >
        All
      </By>
      <By
        onClick={handleFilterChange}
        data-name="Completed"
        selected={selected === "Completed"}
      >
        Completed
      </By>
      <By
        onClick={handleFilterChange}
        data-name="Incompleted"
        selected={selected === "Incompleted"}
      >
        Incompleted
      </By>
    </Container>
  );
};

export default FilterComponent;
