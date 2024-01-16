import React from "react";
import styled from "styled-components";

const StyledMain = styled.div`
  align-items: center;
  background-color: #b09ae2;
  border-radius: 43px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 5% 7%;
  position: relative;
  max-width: 100%;


  & .MAIN-INNER {
    height: 862px;
    margin-left: -17.5px;
    margin-right: -17.5px;
    position: relative;
    width: 1167px;
  }

  & .overlap {
    height: 425px;
    left: 22px;
    position: absolute;
    top: 414px;
    width: 1243px;
  }

  & .overlap-group {
    height: 425px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1243px;
  }

  & .GRAPHS-IMAGE {
    height: 425px;
    left: 627px;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 616px;
  }

  & .PROJECTIONS-FOR {
    color: transparent;
    font-family: "Roboto", Helvetica;
    font-size: 35px;
    font-weight: 500;
    left: 0;
    letter-spacing: 0.7px;
    line-height: 57px;
    position: absolute;
    top: 126px;
    white-space: nowrap;
    width: 703px;
  }

  & .text-wrapper {
    color: #000000a3;
  }

  & .div {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 178px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 297px;
    white-space: nowrap;
  }

  & .p {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 132px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 240px;
    white-space: nowrap;
  }

  & .text-wrapper-2 {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 90px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 183px;
    white-space: nowrap;
  }

  & .INSTANTLY-SEE-TAX {
    color: transparent;
    font-family: "Roboto", Helvetica;
    font-size: 35px;
    font-weight: 500;
    left: 504px;
    letter-spacing: 0.7px;
    line-height: 57px;
    position: absolute;
    top: 76px;
    white-space: nowrap;
    width: 541px;
  }

  & .UPLOAD-IMAGES {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 472px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 247px;
    white-space: nowrap;
  }

  & .BUDGET-EFFECTIVELY {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 516px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 190px;
    white-space: nowrap;
  }

  & .text-wrapper-3 {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 25px;
    font-weight: 500;
    left: 428px;
    letter-spacing: 0.5px;
    line-height: 57px;
    position: absolute;
    top: 133px;
    white-space: nowrap;
  }
`;

export const MainSectionComponent = () => {
  return (
    <StyledMain>
      <div className="MAIN-INNER">
        <div className="overlap">
          <div className="overlap-group">
            <img
              className="GRAPHS-IMAGE"
              alt="Graphs IMAGE"
              src="https://c.animaapp.com/j0wLmcPx/img/graphs-image.png"
            />
            <p className="PROJECTIONS-FOR">
              <span className="text-wrapper">
                PROJECTIONS FOR INFORMED DECISIONS
                <br />
              </span>
              <span className="text-wrapper">
                <br />
              </span>
              <span className="text-wrapper">{""}</span>
            </p>
          </div>
          <div className="div">TEST DIFFERENT SCENARIOS</div>
          <p className="p">INSIGHT FOR LONG TERM PLANNING</p>
          <p className="text-wrapper-2">PLAN FOR FUTURE FINANCIAL MILESTONES</p>
        </div>
        <p className="INSTANTLY-SEE-TAX">
          <span className="text-wrapper">
            INSTANTLY SEE TAX LIABILITIES
            <br />
          </span>
          <span className="text-wrapper">
            <br />
          </span>
          <span className="text-wrapper">{""}</span>
        </p>
        <p className="UPLOAD-IMAGES">UPLOAD IMAGES &amp; INVOICES TO TRACK EXPENSES</p>
        <p className="BUDGET-EFFECTIVELY">BUDGET EFFECTIVELY &amp; IDENTIFY SAVINGS</p>
        <p className="text-wrapper-3">INSTANTLY SEE TAX LIABILITIES AND PLAN ACCORDINGLY</p>
      </div>
    </StyledMain>
  );
};
