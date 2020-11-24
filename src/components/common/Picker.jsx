import React, { Component } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Picker, { PickerPanel } from 'rc-picker';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import enUS from 'rc-picker/lib/locale/en_US';
import 'rc-picker/assets/index.css'; // TODO: need to remove

class RCPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isInvalid, className, reference, ...rest } = this.props;
    return (
      <Picker
        className={`${className} ${isInvalid && 'rc-picker-invalid'}`}
        dropdownClassName={className}
        ref={reference}
        {...rest}
      ></Picker>
    );
  }
}

export { PickerPanel, momentGenerateConfig, enUS };

export const panelCSS = ({ theme }) => css`
  .rc-picker-panel {
    border: none;
    background-color: ${theme.colors.white};
    .rc-picker-datetime-panel {
    }
    .rc-picker-date-panel {
      margin: 8px;
      padding: 8px;
      border-radius: 8px;
      background-color: ${theme.colors.gray['50']};
      .rc-picker-header {
        padding: 4px 10px;
        > button {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          color: ${theme.colors.gray['400']};
          :hover {
            background-color: ${theme.colors.gray['200']};
          }
        }
        .rc-picker-header-view {
          padding: 0 12px;
          display: flex;
          justify-content: space-around;
        }
      }
      .rc-picker-body {
        .rc-picker-content {
          thead {
            tr {
              height: 40px;
            }
            color: ${theme.colors.gray['400']};
            font-size: ${theme.fontSizes['md']};
          }
          tbody {
            .rc-picker-cell .rc-picker-cell-inner {
              font-size: 16px;
              width: 40px;
              height: 40px;
              margin: 1px;
              line-height: 40px;
              border-radius: 8px;
            }
            .rc-picker-cell:not(.rc-picker-cell-disabled):not(.rc-picker-cell-selected)
              .rc-picker-cell-inner {
              :hover {
                color: ${theme.colors.black};
                background-color: ${theme.colors.blue['100']} !important;
              }
            }
            .rc-picker-cell-today .rc-picker-cell-inner {
              border-color: ${theme.colors.blue['500']} !important;
            }
            .rc-picker-cell-selected .rc-picker-cell-inner {
              color: ${theme.colors.white};
              background-color: ${theme.colors.blue['500']} !important;
            }
            .rc-picker-cell-disabled {
              opacity: 1;
              .rc-picker-cell-inner {
                cursor: not-allowed;
                text-decoration: line-through;
                position: relative;
                color: ${theme.colors.gray['400']};
                background-color: ${theme.colors.gray['100']} !important;
              }
              :not(:first-of-type) .rc-picker-cell-inner::before {
                content: '';
                position: absolute;
                height: 40px;
                width: 20px;
                left: -12px;
                background-color: ${theme.colors.gray['100']};
              }
            }
          }
        }
      }
    }
    .rc-picker-time-panel {
      margin: 8px;
      border-radius: 8px;
      border-left: none;
      background-color: ${theme.colors.gray['50']};
      .rc-picker-header {
        padding: 12px 0;
        border-bottom: 1px solid ${theme.colors.gray['100']};
        .rc-picker-header-view {
          flex: none;
          position: relative;
          left: 50%;
          transform: translateX(-33%);
          :after {
            content: '';
            height: 100%;
            width: 22px;
            position: absolute;
            background-color: ${theme.colors.gray['50']};
            right: 0;
          }
        }
      }
      .rc-picker-content {
        max-height: 295px;
        margin: 4px 0px;
        .rc-picker-time-panel-column {
          padding: 0 8px 251px;
          width: 56px;
          ::-webkit-scrollbar {
            display: none;
          }
          .rc-picker-time-panel-cell {
            height: 40px;
            width: 40px;
            margin: 4px 0;
            border-radius: 8px;
            transition: all 0.2s;
            .rc-picker-time-panel-cell-inner {
              font-size: ${theme.fontSizes['md']};
              height: 40px;
              line-height: 40px;
              padding-left: 11px;
            }
          }
          .rc-picker-time-panel-cell:not(.rc-picker-time-panel-cell-disabled):not(.rc-picker-time-panel-cell-selected):hover {
            background-color: ${theme.colors.blue['100']};
          }
          .rc-picker-time-panel-cell-selected {
            .rc-picker-time-panel-cell-inner {
              color: ${theme.colors.white};
            }
            background-color: ${theme.colors.blue['500']};
          }
          .rc-picker-time-panel-cell-disabled {
            .rc-picker-time-panel-cell-inner {
              color: ${theme.colors.gray['400']};
              text-decoration: line-through;
            }
            cursor: not-allowed;
            background-color: ${theme.colors.gray['100']};
          }
        }
      }
    }
    .rc-picker-month-panel {
      margin: 8px;
      padding: 8px;
      border-radius: 8px;
      background-color: ${theme.colors.gray['50']};
      .rc-picker-header {
        padding: 4px 10px;
        > button {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          color: ${theme.colors.gray['400']};
          :hover {
            background-color: ${theme.colors.gray['200']};
          }
        }
        .rc-picker-header-view {
          padding: 0 12px;
          display: flex;
          justify-content: space-around;
        }
      }
      .rc-picker-body {
        .rc-picker-content {
          tbody {
            tr {
              .rc-picker-cell {
                .rc-picker-cell-inner {
                  margin: 8px;
                  font-size: ${theme.fontSizes['md']};
                  line-height: 40px;
                  height: 40px;
                  width: 64px;
                  border-radius: 8px;
                }
              }
              .rc-picker-cell:not(.rc-picker-cell-disabled):not(.rc-picker-cell-selected):hover {
                .rc-picker-cell-inner {
                  background-color: ${theme.colors.blue['100']} !important;
                }
              }
              .rc-picker-cell-selected {
                .rc-picker-cell-inner {
                  color: ${theme.colors.white};
                  background-color: ${theme.colors.blue['500']} !important;
                }
              }
              .rc-picker-cell-disabled {
                .rc-picker-cell-inner {
                  cursor: not-allowed;
                  background-color: ${theme.colors.gray['100']} !important;
                }
              }
            }
          }
        }
      }
    }
    .rc-picker-year-panel {
      margin: 8px;
      padding: 8px;
      border-radius: 8px;
      background-color: ${theme.colors.gray['50']};
      .rc-picker-header {
        padding: 4px 10px;
        > button {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          color: ${theme.colors.gray['400']};
          :hover {
            background-color: ${theme.colors.gray['200']};
          }
        }
        .rc-picker-header-view {
          padding: 0 12px;
          display: flex;
          justify-content: space-around;
        }
      }
      .rc-picker-body {
        .rc-picker-content {
          tbody {
            tr {
              .rc-picker-cell {
                .rc-picker-cell-inner {
                  margin: 8px;
                  font-size: ${theme.fontSizes['md']};
                  line-height: 40px;
                  height: 40px;
                  width: 64px;
                  border-radius: 8px;
                }
              }
              .rc-picker-cell:not(.rc-picker-cell-disabled):not(.rc-picker-cell-selected):hover {
                .rc-picker-cell-inner {
                  background-color: ${theme.colors.blue['100']} !important;
                }
              }
              .rc-picker-cell-selected {
                .rc-picker-cell-inner {
                  color: ${theme.colors.white};
                  background-color: ${theme.colors.blue['500']} !important;
                }
              }
              .rc-picker-cell-disabled {
                .rc-picker-cell-inner {
                  cursor: not-allowed;
                  background-color: ${theme.colors.gray['100']} !important;
                }
              }
            }
          }
        }
      }
    }
    .rc-picker-decade-panel {
      margin: 8px;
      padding: 8px;
      border-radius: 8px;
      background-color: ${theme.colors.gray['50']};
      .rc-picker-header {
        padding: 4px 10px;
        > button {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          color: ${theme.colors.gray['400']};
          :hover {
            background-color: ${theme.colors.gray['200']};
          }
        }
        .rc-picker-header-view {
          padding: 0 12px;
          display: flex;
          justify-content: space-around;
        }
      }
      .rc-picker-body {
        .rc-picker-content {
          tbody {
            tr {
              .rc-picker-cell {
                .rc-picker-cell-inner {
                  margin: 8px;
                  font-size: ${theme.fontSizes['md']};
                  line-height: 40px;
                  height: 40px;
                  width: 100px;
                  border-radius: 8px;
                }
              }
              .rc-picker-cell:not(.rc-picker-cell-disabled):not(.rc-picker-cell-selected):hover {
                .rc-picker-cell-inner {
                  background-color: ${theme.colors.blue['100']} !important;
                }
              }
              .rc-picker-cell-selected {
                .rc-picker-cell-inner {
                  color: ${theme.colors.white};
                  background-color: ${theme.colors.blue['500']} !important;
                }
              }
              .rc-picker-cell-disabled {
                .rc-picker-cell-inner {
                  cursor: not-allowed;
                  background-color: ${theme.colors.gray['100']} !important;
                }
              }
            }
          }
        }
      }
    }
    .rc-picker-footer {
      position: relative;
      background-color: transparent;
      .rc-picker-footer-extra {
        margin: 8px;
        button {
          width: 100px;
          height: 32px;
          font-weight: normal;
          border-radius: 8px;
          box-sizing: border-box;
          transition: all 0.2s;
        }
        .rc-picker-footer-extra-cancel-button {
          margin-right: 8px;
          border: 1px solid ${theme.colors.gray['100']};
          background-color: ${theme.colors.white};
          :hover {
            background-color: ${theme.colors.gray['200']};
          }
        }
        .rc-picker-footer-extra-confirm-button {
          color: ${theme.colors.white};
          border: 1px solid ${theme.colors.blue['500']};
          background-color: ${theme.colors.blue['500']};
          :hover {
            background-color: ${theme.colors.blue['600']};
          }
        }
      }
      .rc-picker-ranges {
        display: none;
        margin: 8px;
        .rc-picker-now {
          display: none;
        }
        .rc-picker-ok {
          button {
            width: 100px;
            height: 32px;
            border-radius: 8px;
            box-sizing: border-box;
            color: ${theme.colors.white};
            background-color: ${theme.colors.blue['500']};
            transition: all 0.2s;
            :hover {
              background-color: ${theme.colors.blue['600']};
            }
          }
        }
      }
    }
  }
`;

export default styled(RCPicker)`
  &.rc-picker {
    width: 100%;
    height: 40px;
    border: none;
    .rc-picker-input {
      input {
        font-size: initial;
        border-radius: 8px;
        padding: 0 16px;
        outline: none;
        border: 1px solid ${(props) => props.theme.colors.gray['200']};
        transition: all 0.2s;
        :hover {
          border-color: ${(props) => props.theme.colors.gray['300']};
        }
      }
    }
  }
  &.rc-picker-focused {
    .rc-picker-input {
      input {
        border-color: ${(props) => props.theme.colors.blue['500']} !important;
        box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue['500']};
      }
    }
  }

  &.rc-picker-dropdown {
    /* width: 500px; */
    /* height: 432px; */
    z-index: 99;
    padding: 8px;
    border-radius: 8px;
    border: none;
    transform: translate(16px -32px);
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: 0px 2px 6px ${(props) => props.theme.colors.gray['200']};
    .rc-picker-panel-container {
    }
  }
  /* Invalid */
  &.rc-picker.rc-picker-invalid {
    border: none;
    .rc-picker-input {
      input {
        border: 1px solid ${(props) => props.theme.colors.red['500']} !important;
        box-shadow: 0 0 0 1px ${(props) => props.theme.colors.red['500']};
        :hover {
          border-color: ${(props) => props.theme.colors.red['500']};
        }
      }
    }
  }
`;
